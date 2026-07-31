import pygame
import sys

# -----------------------------
# Einstellungen
# -----------------------------
WIDTH = 1280
HEIGHT = 720
FPS = 60

pygame.init()

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Der letzte Ritter")

clock = pygame.time.Clock()

# -----------------------------
# Farben
# -----------------------------
SKY = (186, 225, 255)
GROUND = (110, 180, 90)

# -----------------------------
# Spieler
# -----------------------------
player = pygame.Rect(100, 500, 50, 70)

speed = 6
gravity = 0.8
jump_power = -16
velocity_y = 0
on_ground = False

running = True

# -----------------------------
# Hauptschleife
# -----------------------------
while running:

    clock.tick(FPS)

    # Ereignisse
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()

    # Bewegung
    if keys[pygame.K_a]:
        player.x -= speed

    if keys[pygame.K_d]:
        player.x += speed

    # Springen
    if keys[pygame.K_SPACE] and on_ground:
        velocity_y = jump_power
        on_ground = False

    # Gravitation
    velocity_y += gravity
    player.y += velocity_y

    # Boden
    if player.bottom >= 650:
        player.bottom = 650
        velocity_y = 0
        on_ground = True

    # -------------------------
    # Zeichnen
    # -------------------------
    screen.fill(SKY)

    pygame.draw.rect(screen, GROUND, (0, 650, WIDTH, 70))

    # Platzhalter für den Ritter
    pygame.draw.rect(screen, (90, 90, 90), player)

    pygame.display.flip()

pygame.quit()
sys.exit()
