import pygame

class Player:

    def __init__(self, x, y):

        self.image = pygame.image.load("assets/sprites/knight_idle.png").convert_alpha()

        self.rect = self.image.get_rect(topleft=(x, y))

        self.speed = 6

        self.jump_power = -16

        self.gravity = 0.8

        self.velocity_y = 0

        self.on_ground = False

        self.direction = 1

        self.current_brush = "blue"

        self.hp = 100

    def move(self, keys):

        if keys[pygame.K_a]:
            self.rect.x -= self.speed
            self.direction = -1

        if keys[pygame.K_d]:
            self.rect.x += self.speed
            self.direction = 1

        if keys[pygame.K_SPACE] and self.on_ground:
            self.velocity_y = self.jump_power
            self.on_ground = False

    def physics(self):

        self.velocity_y += self.gravity
        self.rect.y += self.velocity_y

        if self.rect.bottom >= 650:
            self.rect.bottom = 650
            self.velocity_y = 0
            self.on_ground = True

    def draw(self, screen):

        image = self.image

        if self.direction == -1:
            image = pygame.transform.flip(image, True, False)

        screen.blit(image, self.rect)
