import warnings
with warnings.catch_warnings():
    warnings.filterwarnings("ignore",category=FutureWarning)
    import tensorflow as tf
    from tensorflow import keras
    import numpy as np
    from tensorflow.keras.preprocessing.text import Tokenizer

import os

from time import time
from tensorflow.python.keras.callbacks import TensorBoard

tf.logging.set_verbosity(tf.logging.ERROR)
tf.logging.set_verbosity(tf.logging.get_verbosity())

batch_size = 2048
num_classes = 10
epochs = 100

# The data, split between train and test sets:
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

# Convert class vectors to binary class matrices.
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255

layers = keras.layers
model = keras.Sequential([
            layers.Conv2D(32, (3, 3), padding='same', activation=tf.nn.relu, input_shape=x_train.shape[1:]),
            layers.Conv2D(32, (3, 3),activation=tf.nn.relu),
            layers.MaxPooling2D(pool_size=(2, 2)),
            layers.Dropout(0.25),

            layers.Conv2D(64, (3, 3), padding='same',activation=tf.nn.relu),
            layers.Conv2D(64, (3, 3),activation=tf.nn.relu),
            layers.MaxPooling2D(pool_size=(2, 2)),
            layers.Dropout(0.25),

            layers.Flatten(),
            layers.Dense(512, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(num_classes,activation='softmax')
])

# initiate RMSprop optimizer
opt = keras.optimizers.RMSprop(lr=0.0001, decay=1e-6)

tensorboard = TensorBoard(log_dir="logs/{}".format(time()))

# Let's train the model using RMSprop
model.compile(loss='categorical_crossentropy',
              optimizer=opt,
              metrics=['accuracy'])

model.fit(x_train, y_train,
            batch_size=batch_size,
            epochs=epochs,
            validation_data=(x_test, y_test),
            shuffle=True,
            callbacks=[tensorboard])

# Save model and weights
save_dir = os.path.join(os.getcwd(), 'saved_models')
model_name = 'keras_cifar10_trained_model.h5'

if not os.path.isdir(save_dir):
    os.makedirs(save_dir)
model_path = os.path.join(save_dir, model_name)
model.save(model_path)
print('Saved trained model at %s ' % model_path)

# evaluate trained model
scores = model.evaluate(x_test, y_test, verbose=1)
print('Test loss:', scores[0])
print('Test accuracy:', scores[1])
