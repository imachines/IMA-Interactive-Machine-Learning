import tensorflow as tf
from tensorflow import keras
import numpy as np
import os

###################### data set ######################

# Fashion Minst dataset 28*28 pixels
# Load the data, here is simple since it's built in keras
fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# some basic idea on the dataset
print(len(train_labels), train_labels.shape, train_labels[0])
print(len(train_images), train_images.shape,train_images[0])

class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat', 
'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

train_images = train_images / 255.0
test_images = test_images / 255.0

###################### Model ######################

# model structure 
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
        # now: model.output_shape == (None, 784)
    keras.layers.Dense(128, activation=tf.nn.relu),
        # now: (after dot product<128> then relu activation) model.output_shape == (128)
    keras.layers.Dense(10, activation=tf.nn.softmax)
        # now: (after dot product<10> then softmax activation) model.output_shape == (10)

])

###################### Train ######################

# define training parameters
model.compile(optimizer='adam', 
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# train
model.fit(train_images, train_labels, epochs=10) 

# save the model
model.save('fashion_mnist.h5')

# evaluate(after training) and see how the trained model works
test_loss, test_acc = model.evaluate(test_images, test_labels)
print('Test accuracy:', test_acc)

###################### Application ######################

# prediction
predictions = model.predict(test_images)
prediction_0 = predictions[0] # 10 probablities
prediction_label = np.argmax(prediction_0)
prediction_classname = class_names[prediction_label]
print("The model says: I think the given image is {}".format(prediction_classname))