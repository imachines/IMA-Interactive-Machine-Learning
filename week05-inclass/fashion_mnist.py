import tensorflow as tf
from tensorflow import keras
import numpy as np

# import matplotlib.pyplot as plt
# import matplotlib.image as mpimg


# load data
# fashion_mnist dataset

fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels),(test_images,test_labels) = fashion_mnist.load_data()

# check size of datasets
print(len(train_labels),train_images.shape)
print(len(test_labels),test_images.shape)

class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat','Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

# index = np.random.randint(0,60000)
# plt.imsave("sample-{}.png".format(index),train_images[index])
# imgplot = plt.imshow(train_images[index])
# plt.show()
# print("The showed image is {}".format(class_names[train_labels[index]]))

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

# train hyper parameters
model.compile(optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
        )

# how many rounds we want the model be trained
model.fit(train_images,train_labels,epochs=5)
model.save("fashion_mnist.h5")
print("-----------------------------------------------model saved as fashion_mnist.h5-----------------------------------------------")

# evaluate
test_loss,test_acc = model.evaluate(test_images,test_labels)

"""
predictions = model.predict(test_images)
random_image = np.random.randint(0,10000)
prediction = predictions[random_image]
prediction_label_index = np.argmax(prediction)
prediction_label = class_names[prediction_label_index]
print("The model says: this is a {}".format(prediction_label))
imgplot = plt.imshow(test_images[random_image])
plt.show()
"""













# :)
