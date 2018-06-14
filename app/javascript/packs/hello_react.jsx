import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Page, Card, Button, Thumbnail} from '@shopify/polaris';

const Hello = props => (
   <Page title="Products">
    {props.products.map((product, index) => (
    <Card key={index}
      title={product.title}
      primaryFooterAction={{
        content: 'View',
        url: `https://${props.shop_session.url}/admin/products/${product.id}`,
      }}
      sectioned
    >
      {product.images[0] &&
        <Thumbnail
          source={product.images[0].src}
          alt={product.title}
          size="large"
        />
      }

    </Card>
    ))}
  </Page>
)
// Render component with data
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('hello-react')
  const data = JSON.parse(node.getAttribute('data'))
ReactDOM.render(<Hello {...data} />, node)
})
