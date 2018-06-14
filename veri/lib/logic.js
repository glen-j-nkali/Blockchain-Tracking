'use strict';

/**
 * Product Add transaction
 * @param {com.shopify.veri.AddProduct} AddProduct
 * @transaction
 */
async function AddProduct(tx) {
    let factory = await getFactory();
    product = factory.newResource('com.shopify.veri', 'Product', tx.productId);
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






















/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {com.shopify.veri.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('com.shopify.veri.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('com.shopify.veri', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}