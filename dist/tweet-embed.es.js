import React, { PropTypes } from 'react';

const callbacks = [];

function addScript(src, cb) {
  if (callbacks.length === 0) {
    callbacks.push(cb);
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = () => callbacks.forEach(cb => cb());
    document.body.appendChild(s);
  } else {
    callbacks.push(cb);
  }
}

class TweetEmbed extends React.Component {
  componentDidMount() {
    const options = this.props.options || {};

    const renderTweet = () => {
      window.twttr.widgets.createTweetEmbed(this.props.id, this._div, options);
    };

    if (!window.twttr) {
      const protocol = window.location.protocol.indexOf('file') >= 0 ? this.props.defaultProtocol : '';

      addScript(`${protocol}//platform.twitter.com/widgets.js`, renderTweet);
    } else {
      renderTweet();
    }
  }
  render() {
    return React.createElement('div', { ref: c => {
        this._div = c;
      } });
  }
}

TweetEmbed.propTypes = {
  id: PropTypes.string,
  options: PropTypes.object,
  defaultProtocol: PropTypes.string
};

TweetEmbed.defaultProps = {
  defaultProtocol: 'https:'
};

export default TweetEmbed;
