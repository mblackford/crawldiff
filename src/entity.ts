'use strict'

import { JSDOM } from 'jsdom'
import Link from './link'
import LinkType from './link-type'
import Url from 'url-parse'

class Entity {
  readonly link: Link
  readonly status: number
  readonly body: string
  readonly contentType: string|null

  private dom: JSDOM|null = null

  constructor(link: Link, status: number, body: string, contentType: string|null) {
    this.link = link
    this.status = status
    this.body = body
    this.contentType = contentType
  }

  private buildDom(): JSDOM {
    if (this.dom == null) {
      this.dom = new JSDOM(this.body, { url: this.link.uri })
    }
    return this.dom
  }

  parseLinks(): Array<Link> {
    // Find all the selected elements
    const dom = this.buildDom()
    const domLinks: Array<any> = dom.window.document.querySelectorAll('a')
    const rawLinks =  Object.values(domLinks).map(l => l.href)

    // Use the URL library and deconstruct the links, using the current hostname for all 
    const urlObjects = rawLinks.map(l => new Url(l, this.link.uri))

    // Filter out any links to external sites (by comparing the link hostname to this one)
    const baseUri = new Url(this.link.uri)
    const internalLinks = urlObjects.filter(l => l.hostname == baseUri.hostname)

    // For pages, leave only the protocol, host, and path
    const trimmedLinks = internalLinks.map(l => l.origin + l.pathname)

    // Wrap in objects and return
    return trimmedLinks.map(l => new Link(l, LinkType.Page))
  }

  parseScripts(): Array<Link> {
    return this.parseSelector('script[src]', LinkType.Script, (l: any) => l.src)
  }

  parseLinkTags(): Array<Link> {
    return this.parseSelector('link[href]', LinkType.Link, (l: any) => l.href)
  }

  private parseSelector(selector: string, type: LinkType, extractFn: any): Array<Link> {
    // Find all the selected elements
    const dom = this.buildDom()
    const domLinks: Array<any> = dom.window.document.querySelectorAll(selector)
    const rawLinks: Array<string> = Object.values(domLinks).map(extractFn)

    // Use the URL library and deconstruct the links, using the current hostname for all 
    const urlObjects = rawLinks.map(l => new Url(l, this.link.uri))

    // Filter out any links to external sites (by comparing the link hostname to this one)
    const baseUri = new Url(this.link.uri)
    const internalLinks = urlObjects.filter(l => l.hostname == baseUri.hostname)

    // Wrap the full link in objects and return
    return internalLinks.map(l => new Link(l.href, type))
  }
}

export default Entity
