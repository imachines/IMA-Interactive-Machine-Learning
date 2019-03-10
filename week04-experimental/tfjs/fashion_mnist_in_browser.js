import * as tf from '@tensorflow/tfjs';

const model = await tf.loadModel('tfjs/fashion_mnist_tfjs.json');

const example = tf.fromPixels(webcamElement);  // for example
const prediction = model.predict(example);