namespace SpriteKind {
    export const block = SpriteKind.create()
}
// ブロックに当たった処理
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.block, function (sprite, otherSprite) {
    getpos(sprite, otherSprite)
    if (dir == 0) {
        ball.setVelocity(ball.vx, ball.vy * -1)
    } else {
        ball.setVelocity(ball.vx * -1, ball.vy)
    }
    otherSprite.destroy(effects.trail, 100)
    blockCount += 1
    info.changeScoreBy(scoreAdd)
    scoreAdd += 1
    if (ball.vx < 0) {
        ball.vx += -0.5
    } else {
        ball.vx += 0.5
    }
    if (ball.vy < 0) {
        ball.vy += -0.5
    } else {
        ball.vy += 0.5
    }
})
// 横から当たったかどうかを判定
function getpos (sprite: Sprite, otherSprite: Sprite) {
    if (otherSprite.x < sprite.x - 8 || otherSprite.x > sprite.x + 8) {
        dir = 1
    } else {
        dir = 0
    }
}
// ブロックを5*9で45個並べる
function makeBlocks () {
    BlockNum = 0
    for (let index = 0; index <= 4; index++) {
        for (let index2 = 0; index2 <= 8; index2++) {
            block = sprites.create(img`
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
1 9 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
1 9 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
1 9 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
1 9 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
1 9 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.block)
            block.setPosition(index2 * 16 + 16, index * 8 + 16)
            BlockNum += 1
        }
    }
}
// パドルでの跳ね返り
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (ball.vy > 0) {
        ball.setVelocity(ball.vx, ball.vy * -1)
        music.playTone(523, music.beat(BeatFraction.Eighth))
        scoreAdd = 1
    }
})
let block: Sprite = null
let BlockNum = 0
let dir = 0
let ball: Sprite = null
let scoreAdd = 0
game.setDialogFrame(img`
. . b b b b b b b b b b b b b b b b b b b b . . 
. b d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d b . 
b d 1 d b b b b b b b b b b b b b b b b d 1 d b 
b 1 d b b b b b b b b b b b b b b b b b b d 1 b 
b 1 b d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 1 b 
b 1 b d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d b 1 b 
b d 1 b b b b b b b b b b b b b b b b b b 1 d b 
b b d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d b b 
. b b b b b b b b b b b b b b b b b b b b b b . 
. . b b b b b b b b b b b b b b b b b b b b . . 
`)
game.showLongText("Let's Brake blocks", DialogLayout.Bottom)
let blockCount = 0
scoreAdd = 1
info.setScore(0)
makeBlocks()
let paddle = sprites.create(img`
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
`, SpriteKind.Player)
paddle.setPosition(80, 108)
controller.moveSprite(paddle, 150, 0)
paddle.setFlag(SpriteFlag.StayInScreen, true)
ball = sprites.createProjectileFromSprite(img`
. . 5 5 . . 
. 5 5 5 5 . 
5 5 5 5 5 5 
5 5 5 5 5 5 
. 5 5 5 5 . 
. . 5 5 . . 
`, paddle, 45, -45)
ball.setFlag(SpriteFlag.BounceOnWall, true)
// ゲームオーバー判定
forever(function () {
    if (ball.y > 114) {
        game.over(false)
    }
    if (BlockNum <= blockCount) {
        ball.destroy()
        game.over(true)
    }
})
