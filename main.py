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

# Yılanın kuyruğu (Veri Zinciri)
segments = []

# Skor Değişkenleri
score = 0
high_score = 0

# Skor Tablosu
pen = turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, 260)
pen.write("Erişim: 0  Maksimum Erişim: 0", align="center", font=("Courier", 16, "normal"))

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

    # Duvar (Güvenlik Duvarı) çarpışma kontrolü
    if head.xcor() > 290 or head.xcor() < -290 or head.ycor() > 290 or head.ycor() < -290:
        time.sleep(1)
        head.goto(0, 0)
        head.direction = "stop"

        for segment in segments:
            segment.goto(1000, 1000)
        segments.clear()

        score = 0
        pen.clear()
        pen.write("Erişim: {}  Maksimum Erişim: {}".format(score, high_score), align="center", font=("Courier", 16, "normal"))

    # Yem yeme durumu (Veri/Hedef ele geçirildiğinde)
    if head.distance(food) < 20:
        x = random.randint(-280, 280)
        y = random.randint(-280, 280)
        food.goto(x, y)

        # Yeni parça ekle
        new_segment = turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("square")
        new_segment.color("#008000")  # Koyu neon yeşil
        new_segment.penup()
        segments.append(new_segment)

        # Skoru artır
        score += 10
        if score > high_score:
            high_score = score
        pen.clear()
        pen.write("Erişim: {}  Maksimum Erişim: {}".format(score, high_score), align="center", font=("Courier", 16, "normal"))

    # Kuyruk parçalarının pozisyonlarını güncelle
    for index in range(len(segments)-1, 0, -1):
        x = segments[index-1].xcor()
        y = segments[index-1].ycor()
        segments[index].goto(x, y)

    # İlk parçayı kafaya bağla
    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x, y)

    move()

    # Kuyruk (Kendine) çarpışma kontrolü
    for segment in segments:
        if segment.distance(head) < 20:
            time.sleep(1)
            head.goto(0, 0)
            head.direction = "stop"

            for segment_obj in segments:
                segment_obj.goto(1000, 1000)
            segments.clear()

            score = 0
            pen.clear()
            pen.write("Erişim: {}  Maksimum Erişim: {}".format(score, high_score), align="center", font=("Courier", 16, "normal"))

    time.sleep(0.1)
