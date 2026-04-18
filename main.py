import turtle
import time
import random

# Initial Theme: Nature
THEME_1 = {
    "bg": "#E8F5E9",           # Light Green Background
    "head": "#2E7D32",         # Dark Green Head
    "body": "#4CAF50",         # Green Body
    "food": "#F44336",         # Red Food (Apple)
    "text": "#1B5E20"          # Dark Text
}

# Second Theme: Space (Score >= 50)
THEME_2 = {
    "bg": "#1A237E",           # Dark Blue Background
    "head": "#00E5FF",         # Neon Cyan Head
    "body": "#80D8FF",         # Light Blue Body
    "food": "#FFD700",         # Gold Food (Star)
    "text": "#E8EAF6"          # Light Text
}

current_theme = THEME_1

window = turtle.Screen()
window.title("Modern Snake")
window.bgcolor(current_theme["bg"])
window.setup(width=600, height=600)
window.tracer(0)

# Snake Head
head = turtle.Turtle()
head.speed(0)
head.shape("circle")
head.color(current_theme["head"])
head.penup()
head.goto(0, 0)
head.direction = "stop"

# Food
food = turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color(current_theme["food"])
food.penup()
food.goto(0, 100)

segments = []

score = 0
high_score = 0

pen = turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color(current_theme["text"])
pen.penup()
pen.hideturtle()
pen.goto(0, 260)
pen.write("Skor: 0  Rekor: 0", align="center", font=("Arial", 16, "bold"))

def update_theme():
    global current_theme
    # Temayı belirle
    if score >= 50:
        new_theme = THEME_2
    else:
        new_theme = THEME_1
        
    if current_theme != new_theme:
        current_theme = new_theme
        window.bgcolor(current_theme["bg"])
        head.color(current_theme["head"])
        food.color(current_theme["food"])
        pen.color(current_theme["text"])
        
        for index, segment in enumerate(segments):
            segment.color(current_theme["body"])
            
        pen.clear()
        pen.write(f"Skor: {score}  Rekor: {high_score}", align="center", font=("Arial", 16, "bold"))


def go_up():
    if head.direction != "down":
        head.direction = "up"

def go_down():
    if head.direction != "up":
        head.direction = "down"

def go_left():
    if head.direction != "right":
        head.direction = "left"

def go_right():
    if head.direction != "left":
        head.direction = "right"

def move():
    if head.direction == "up":
        y = head.ycor()
        head.sety(y + 20)

    if head.direction == "down":
        y = head.ycor()
        head.sety(y - 20)

    if head.direction == "left":
        x = head.xcor()
        head.setx(x - 20)

    if head.direction == "right":
        x = head.xcor()
        head.setx(x + 20)

window.listen()
window.onkeypress(go_up, "Up")
window.onkeypress(go_down, "Down")
window.onkeypress(go_left, "Left")
window.onkeypress(go_right, "Right")

def reset_game():
    global score
    time.sleep(1)
    head.goto(0, 0)
    head.direction = "stop"

    for segment in segments:
        segment.goto(1000, 1000)
    segments.clear()

    score = 0
    update_theme()
    pen.clear()
    pen.write(f"Skor: {score}  Rekor: {high_score}", align="center", font=("Arial", 16, "bold"))


while True:
    window.update()

    # Wall Collision
    if head.xcor() > 290 or head.xcor() < -290 or head.ycor() > 290 or head.ycor() < -290:
        reset_game()

    # Food Interaction
    if head.distance(food) < 20:
        x = random.randint(-280, 280)
        y = random.randint(-280, 280)
        food.goto(x, y)

        new_segment = turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("circle")
        new_segment.color(current_theme["body"])
        new_segment.penup()
        segments.append(new_segment)

        score += 10
        if score > high_score:
            high_score = score
            
        update_theme()
        pen.clear()
        pen.write(f"Skor: {score}  Rekor: {high_score}", align="center", font=("Arial", 16, "bold"))

    for index in range(len(segments)-1, 0, -1):
        x = segments[index-1].xcor()
        y = segments[index-1].ycor()
        segments[index].goto(x, y)

    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x, y)

    move()

    # Self Collision
    for segment in segments:
        if segment.distance(head) < 20:
            reset_game()

    time.sleep(0.1)

