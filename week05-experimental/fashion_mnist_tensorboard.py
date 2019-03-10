import tensorflow as tf
from tensorflow import keras
import numpy as np

from time import time
from tensorflow.python.keras.callbacks import TensorBoard

# load data
# fashion_mnist dataset

fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels),(test_images,test_labels) = fashion_mnist.load_data()

# check size of datasets
print(len(train_labels),train_images.shape)
print(len(test_labels),test_images.shape)

class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat','Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

train_images = train_images/255.0
test_images = test_images/255.0

# forward propagation
model = keras.Sequential([
            keras.layers.Flatten(input_shape = (28,28)),
            # output shape: 1*784
            keras.layers.Dense(128,activation=tf.nn.relu),
            # output shape: 1*128
            keras.layers.Dense(10,activation=tf.nn.softmax)
            # output shape: 1*10
])

tensorboard = TensorBoard(log_dir="logs/{}".format(time()))

# train hyper parameters
model.compile(optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
        )

# how many rounds we want the model be trained
model.fit(train_images,train_labels,epochs=200,callbacks=[tensorboard])
model.save("fashion_mnist.h5")
# evaluate
test_loss,test_acc = model.evaluate(test_images,test_labels)
















# :)
