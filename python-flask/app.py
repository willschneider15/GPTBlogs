import os

import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        animal = request.form["title"]
        response = openai.Completion.create(
            engine="text-davinci-003",
           
            prompt=generate_prompt(animal),
            temperature=0.5,
            max_tokens=4000,
        )
        file = open("blog", "w+")
        file.write(response.choices[0].text)
        file.close()
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(animal):
    return """Write a section for an article that includes 4-5 paragraphs that are 3-4 sentences long. This section {}.""".format(
        animal.capitalize()
    )
