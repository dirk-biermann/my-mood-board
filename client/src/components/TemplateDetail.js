import React, { Component } from 'react'
import SiteHeader from "./SiteHeader";

export default class TemplateDetail extends Component {
  // -----------------------------------------
  //
  // -----------------------------------------
  render() {
    let pageTitle = 'Template Detail';

    return (
      <>
        <SiteHeader ico="template" title={pageTitle} />
      </>
    )
  }
}
