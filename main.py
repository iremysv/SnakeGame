import turtle
import time
import random

# Oyun ekranı ayarları - Siber Güvenlik Teması
window = turtle.Screen()
window.title("Siber Yılan Oyunu")
window.bgcolor("black")
window.setup(width=600, height=600)
window.tracer(0)

# Yılanın başı (Veri Paketi)
head = turtle.Turtle()
head.speed(0)
head.shape("square")
head.color("#00FF00")  # Neon yeşil
head.penup()
head.goto(0, 0)
head.direction = "stop"

# Yem (Zafiyet/Hedef Veri)
food = turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color("red")  # Kritik açık sembolü (Kırmızı)
food.penup()
food.goto(0, 100)

# Yılanın hareket fonksiyonları
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

# Klavye dinleme
window.listen()
window.onkeypress(go_up, "Up")
window.onkeypress(go_down, "Down")
window.onkeypress(go_left, "Left")
window.onkeypress(go_right, "Right")

# Ana oyun döngüsü
while True:
    window.update()

    # Yem yeme durumu (Veri/Hedef ele geçirildiğinde)
    if head.distance(food) < 20:
        x = random.randint(-280, 280)
        y = random.randint(-280, 280)
        food.goto(x, y)

    move()
    time.sleep(0.1)
