import React, { Component } from "react";

class Paginator extends Component {
  state = {
    currentPageNumber: 1
  };

  handlePageChange = pageNumber => {
    const { pageSize } = this.props;
    const zeroedPageNumber = pageNumber - 1;
    const startIndex = zeroedPageNumber * pageSize;
    let endIndex = (zeroedPageNumber + 1) * pageSize - 1;
    if (endIndex >= this.props.entries) {
      endIndex = this.props.entries;
    }
    this.setState({
      currentPageNumber: pageNumber
    });
    this.props.onPageChange(pageNumber, startIndex, endIndex);
  };

  render() {
    const { entries, pageSize } = this.props;
    const pageCount = Math.ceil(entries / pageSize);
    return (
      <div>
        {this.props.children}
        <ul className="pagination">{this.renderPageNumbers(pageCount)}</ul>
      </div>
    );
  }

  renderPageNumbers(pageCount) {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      let className =
        "page-item" + (i === this.state.currentPageNumber ? " active" : "");

      pages.push(
        <li key={i} className={className}>
          <a
            className="page-link"
            href="#"
            onClick={() => this.handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  }
}

export default Paginator;
