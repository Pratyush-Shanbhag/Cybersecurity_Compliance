from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    try:
        param1 = int(request.args.get('param1', 0))
        param2 = int(request.args.get('param2', 0))
        result = param1 + param2
    except ValueError:
        result = "Invalid input. Please ensure param1 and param2 are integers."
    return render_template('template.html', result=result)

if __name__ == '__main__':
    app.run(host='0.0.0.0')