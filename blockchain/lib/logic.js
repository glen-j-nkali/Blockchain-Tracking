'use strict';

/**
 * Product Add transaction
 * @param {com.shopify.veri.AddProduct} AddProduct
 * @transaction
 */
async function AddProduct(tx) {
    let factory = await getFactory();
    let product = factory.newResource('com.shopify.veri', 'Product', tx.productId);
    product.productId = tx.productId;
    product.productMetaData = tx.productMetaData;
    product.merchant = tx.merchant;

    const assetRegistry = await getAssetRegistry('com.shopify.veri.Product');
    // Update the asset in the asset registry.
    await assetRegistry.add(product);
}


/**
 * Product Validate transaction
 * @param {com.shopify.veri.ValidateProduct} ValidateProduct
 * @transaction
 */
async function ValidateProduct(tx) {
    const assetRegistry = await getAssetRegistry('com.shopify.veri.Product');
    // Update the asset in the asset registry.
    const product = await assetRegistry.get(tx.productId);
    let event = getFactory().newEvent('com.shopify.veri', 'ValidateEvent');
    event.product = product;
    emit(event);
}
