import pygame
import math


class Enemy:

    def __init__(self, x, y):

        self.image = pygame.image.load(
            "assets/sprites/monster.png"
        ).convert_alpha()

        self.rect = self.image.get_rect(
            center=(x, y)
        )

        self.speed = 2

        self.hp = 50

        self.damage = 10

        self.attack_distance = 60


    def update(self, player):

        dx = player.rect.centerx - self.rect.centerx
        dy = player.rect.centery - self.rect.centery

        distance = math.sqrt(dx*dx + dy*dy)

        if distance > self.attack_distance:

            if dx > 0:
                self.rect.x += self.speed

            else:
                self.rect.x -= self.speed


    def attack(self, player):

        if self.rect.colliderect(player.rect):

            player.hp -= self.damage


    def hit(self, damage):

        self.hp -= damage


    def dead(self):

        return self.hp <= 0


    def draw(self, screen):

        screen.blit(
            self.image,
            self.rect
        )



class EnemyManager:

    def __init__(self):

        self.enemies = []


    def add_enemy(self, x, y):

        self.enemies.append(
            Enemy(x, y)
        )


    def update(self, player):

        for enemy in self.enemies[:]:

            enemy.update(player)

            enemy.attack(player)

            if enemy.dead():

                self.enemies.remove(enemy)


    def green_attack(self, player):

        attack_area = pygame.Rect(
            player.rect.centerx-80,
            player.rect.centery-50,
            160,
            100
        )


        for enemy in self.enemies[:]:

            if attack_area.colliderect(enemy.rect):

                enemy.hit(50)


    def draw(self, screen):

        for enemy in self.enemies:

            enemy.draw(screen)
