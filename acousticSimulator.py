import turtle
import math

# --- Screen setup ---
wn = turtle.Screen()
wn.setup(800, 600)
wn.title("Bouncing Turtle with Multiple Polygons")
wn.tracer(0)

# --- Player (ball) setup ---
player = turtle.Turtle()
player.shape("circle")
player.color("blue")
player.penup()
player.speed(0)
player.goto(-250, -150)  # start outside any polygons

# --- Multiple polygons ---
polygons = [
    [(-100, -50), (100, -50), (150, 100), (0, 150), (-150, 100)],  # polygon 1
    [(200, 0), (300, 0), (350, 80), (250, 120)],                  # polygon 2
    [(-300, -200), (-200, -200), (-220, -100)]                    # polygon 3
]

# Draw polygons
polygon_edges = []
drawer = turtle.Turtle()
drawer.penup()
drawer.hideturtle()
drawer.color("red")
for poly in polygons:
    # Draw polygon
    drawer.goto(poly[0])
    drawer.pendown()
    for point in poly[1:] + [poly[0]]:
        drawer.goto(point)
    drawer.penup()
    
    # Add edges for collision detection
    for i in range(len(poly)):
        edge = (poly[i], poly[(i+1)%len(poly)])
        polygon_edges.append(edge)

# --- Velocity vector ---
dx, dy = 4, 3

# --- Helper functions ---
def line_intersect(p0, p1, p2, p3):
    """Check intersection of line segment p0-p1 and p2-p3."""
    s1_x = p1[0] - p0[0]
    s1_y = p1[1] - p0[1]
    s2_x = p3[0] - p2[0]
    s2_y = p3[1] - p2[1]

    denom = (-s2_x * s1_y + s1_x * s2_y)
    if denom == 0:
        return False  # parallel

    s = (-s1_y * (p0[0] - p2[0]) + s1_x * (p0[1] - p2[1])) / denom
    t = ( s2_x * (p0[1] - p2[1]) - s2_y * (p0[0] - p2[0])) / denom

    return 0 <= s <= 1 and 0 <= t <= 1

def reflect_vector(vx, vy, edge):
    """Reflect vector (vx, vy) over edge (p1->p2)."""
    x1, y1 = edge[0]
    x2, y2 = edge[1]
    ex, ey = x2 - x1, y2 - y1
    nx, ny = -ey, ex
    n_len = math.hypot(nx, ny)
    nx, ny = nx / n_len, ny / n_len
    dot = vx*nx + vy*ny
    rx = vx - 2*dot*nx
    ry = vy - 2*dot*ny
    return rx, ry

# --- Update loop ---
def update():
    global dx, dy
    next_pos = (player.xcor() + dx, player.ycor() + dy)
    
    # Check collisions with all edges
    for edge in polygon_edges:
        if line_intersect((player.xcor(), player.ycor()), next_pos, edge[0], edge[1]):
            dx, dy = reflect_vector(dx, dy, edge)
            break  # reflect once per frame

    # Move player
    player.goto(player.xcor() + dx, player.ycor() + dy)
    wn.update()
    wn.ontimer(update, 16)  # ~60 FPS

update()
wn.mainloop()
