import tensorflow as tf
import numpy as np
import requests
import time
import datetime
import json

print("loading model")
one_step_reloaded = tf.saved_model.load('one_step')

config = json.load("config.json")

while True: # main loop
    state = None
    next_char = tf.constant(["yourtetaq: "])
    result = [next_char]
    start = time.time()
    c = 0
    while True: 
        next_char, states = one_step_reloaded.generate_one_step(next_char, states=states)
        if(next_char.numpy() == b"\n"):
           print("recieved \\n")
           break
        print(next_char)
        result.append(next_char)
        c += 1
        if(c >= 300):
           print("message too long")
           break

    result = tf.strings.join(result)[0].numpy().decode("utf-8")
    print(result)
    
    if (config["saveToFile"] == False):
        try:
            levelId = requests.get('http://localhost:2000/api/level/daily').json()["id"]
            requests.post(f'http://localhost:2000/postComment', {"comment":result.split(": ")[1], "username":config["gdAccountName"], "levelID":levelId, "accountID":config["gdAccountId"], "password": config["gdAccountPassword"]})
            cachedId = levelId # cache the id in case something goes wrong aka midnight daily change
        except Exception as e:
            requests.post(f'http://localhost:2000/postComment', {"comment":result.split(": ")[1], "username":config["gdAccountName"], "levelID":cachedId, "accountID":config["gdAccountId"], "password": config["gdAccountPassword"]})
            with open("log.txt", 'a') as log:
                log.write(f'{datetime.datetime.now()} {e}\n')
        end = time.time()
        print(f'{end - start} seconds to send comment')
        time.sleep(config["waitTime"]) # wait a (3.01) minute(s) + whatever it takes to generate the comment lol (about 15 seconds)
    else:
        with open("output.txt", "a") as file:
            file.write(result + "\n")
        time.sleep(1) # wait 1 second before starting again
