/*
 * Defender: 1024 by Keith Clark 
 * 
 * A 1K game inspired by the classic arcade shooter Defender. Written
 * for the 2015 JS1K competition.
 * 
 * Save the humans from alien abduction! Pilot your ship and fire its
 * laser at enemy landers before they abduct and transform humans into
 * mutants programmed to hunt you down!
 * 
 * Use the arrow keys to fly and space to fire.
 *
 * web: keithclark.co.uk | tweet: @keithclarkcouk
 */

// Initialise any globals

H =                                                 // Camera position
$ =                                                 // Game frame ticks
J = 0,                                              // Player fire flag
D = 1,                                              // Player direction
A = 1023,                                           // World width
E = [],                                             // Entity stack

// Handle user input
// W[0] = fire           [space bar]
// W[5] = thrust left    [left arrow]
// W[7] = thrust right   [right arrow]
// W[6] = climb          [up arrow]
// W[8] = dive           [down arrow]

onkeydown = function(k) {                           // key down state handler
  W[k.which - 32] = 1;                                 // set key flag
},
onkeyup = function(k) {                             // key up state handler
  W[k.which - 32] = 0;                                 // clear key flag
},

// Game loop

setInterval(W = function(k) {
  for (
    F = 127,                                           // mountain range Y start position
    c.fillRect(L = 0, C = 0,d = A, A,                  // clear the screen
      c.fillStyle = "hsl(" + C + ",99%,0%)"
    )
    ;
    d--                                                // for 1023 cycles...
    ;
  ) {
    if (

      // Draw a mountain pixel

      C = 25,                                             // set colour to brown
      X = d - H & A,                                      // set pixel X position
      Y = F += Math.cos(d / 5 & -11),                     // set pixel Y position
      X < 255 &&                                             // if the pixel is in the viewport 
        c.fillRect(X << 1, Y << 1, 2, 2,                        // plot the pixel
          c.fillStyle = "hsl(" + C + ",99%,50%)"
        ),

      // Draw a starfield pixel

      C = -F,                                             // set colour to dark blue
      X /= 2,                                             // half mountain X pixel (simple parallax)
      Y = 199 * F & A,                                    // set pixel Y position
      Y < 99 && X < 255 &&                                   // if the pixel is in the viewport
        c.fillRect(X << 1, Y << 1, 2, 2,                        // plot the pixel
          c.fillStyle = "hsl(" + C + ",99%,50%)"
        ),

      // Draw a player lazer pixel

      J && (
        C = 5 * d,                                        // set colour spread from red to green
        X = (16 - E[0].z) * d * D - H + 127 + E[0].x & A, // set X position
        Y = E[0].y,                                       // set Y position matches player Y position
        d < 25 && X < 255 &&                                 // if the pixel is in the viewport 
          c.fillRect(X << 1, Y << 1, 2, 2,                      // plot the pixel
            c.fillStyle = "hsl(" + C + ",99%,50%)"
          )
      ),

      E[d]                                                // check we have an entity to process

    // Game logic

    ) with (E[d]) for (
      l = 55,                                             // entity sprite has is (8 * 7 - 1) bits
      x += u * g,                                         // increment entity X position
      y += v * g,                                         // increment entity Y position
      z && z--,                                           // decrement entity timer (used for fire rate / bullet life etc.)

      w ?                                                 // if this entity warping (w>0) or exploding (w<0)
        (
          s = s.s = 0,                                       // clear link with any other entity (lander -> human -> lander)
          w-- < -25 && (                                     // decrement warp / explosion counter. If explosion has ended...
            A *= t > 0,                                         // stop the game if the entity is the player 
            E.splice(d, 1)                                      // remove the dead entity from the game
          )
        )
      :                                                   // the entity is out of warp and "in play"
        (
          q = -511 + (E[0].x - x + 511 & A),                 // get x delta to player (-511 to +511)
          r = E[0].y - y,                                    // get y delta to player
          p = Math.sqrt(q * q + r * r),                      // get distance to player
          n = Math.atan2(r, q),                              // get angle to player
          p < 5 ?                                            // if entity has hit player
            t > 1 && E[0].w--                                   // if entity is not a human, explode player
          :
            J && -r < 4 && r < 4 &&                          // if player is firing and entity inline with player 
            p < 130 && q * D < 1 && w--,                        // if entity is in front of player, explode entity
          t ?
            t < 2 ?                                          // if entity is a HUMAN
              (
                v = s ?                                         // if grabbed by a lander
                  -1                                               // make human climb (the lander will actually chase it)
                :                                               // if not grabbed by a lander
                  y < 140,                                         // if human is in free air, fall to earth
                y < 1 && (L = 5, w--)                           // if human was captured, kill it and spawn... a... MUTANT!
              )
            :
              t < 3 ?                                        // if entity is a BULLET
                z || (                                         // if entity timer has reached 0
                  u + v ?                                         // and it's moving
                    w = -A                                        // instantly destroy it
                  :
                    (                                        // if it's not moving, it's a new bullet
                      u = Math.cos(n),                       // set X direction to track player
                      v = Math.sin(n),                       // set Y direction to track player
                      z = 99                                    // set bullet life
                    )
                )
              :
                (                                           // if entity is a LANDER or a MUTANT
                  u = Math.cos(n),                             // set X direction to track player
                  v = Math.sin(n),                             // set X direction to track player
                  z || (                                          // if the timer has reached 0
                    L = 3,                                        // spawn a BULLET
                    O = x,                                        // spawn at entity X position
                    N = y,                                        // spawn at entity Y position
                    z = 99 + d                                    // reset the entity firing timer
                  ),

                  s && !s.w && !(s.s && s.s != E[d]) ?         // if tracking a human (a lander)
                    (
                      q = -511 + (s.x - x + 511 & A),             // get x delta to human (-511 to +511)
                      r = s.y - 8 - y,                            // get y delta to human
                      p = Math.sqrt(q * q + r * r),               // get distance to human
                      n = Math.atan2(r, q),                       // get angle to human
                      u = Math.cos(n),                            // set X direction to track human
                      v = Math.sin(n),                            // set Y direction to track human
                      p < 1 && (                                  // if lander is grabbing human
                        x = s.x,                                     // align x values (prevents rounding issues)
                        y -= r,                                      // align y values (prevents rounding issues)
                        s.s = E[d]                                   // link the human to the lander
                      )
                    )
                  :
                    s = t < 4 && E[$ % d],                       // if not tracking and not a mutant - pick an entity...
                    s.t == 1 || (s = 0)                             // if it's a human, track it
                )
            :
              (                                             // if entity is the PLAYER
                H = x + u * 2,                                 // set the camera
                I = !W[5] - !W[7],                             // determine X input
                D = I || D,                                    // set player direction
                u -= I ? u * I < 25 && -I / 2 : u / 25,        // set player X velocity
                y += W[8] ? y < 140 : y && -!!W[6],            // set player Y position
                z || (z = 16 * W[0]),                          // is player able to fire?
                J = z > 9                                      // set player firing flag
              )
          )
      ;

      // Entity rendering

      U = l & 7,                                            // get sprite bit column
      V = l >> 3,                                           // get sprite bit row
      X = x - H + 127 + (V - 3) * D * ++w & A,              // pixel X position
      Y = y + w-- * (U - 3),                                // pixel Y position
      C = 99 * t,                                           // set entity colour
      l--                                                   // decrement counter, ready for next bit
      ;
      (69 ^ "[y}}U]UMA8Z8AMEMYYMEE  {V:V{   {V:V{ ".charCodeAt(7 * t + V)) >> U & 1 && 
        X < 255 && c.fillRect(X << 1, Y << 1, 2, 2,
          c.fillStyle = "hsl(" + C + ",99%,50%)"
        )
    )
    ;

    // Entity spawning

    d || (
        L = $ < 11 ?                                        // first 11 cycles add player / humans
          2 - !$                                               // player if first cycle, or 9 humans
        :
          $ % 99 < 1 && 4,                                  // every 99 cycles add a lander
        N = 70 * L % 240,                                   // the spawn X position
        O = 99 * $                                          // the spawn Y position
    ),

    L && E.push({                                        // If new entity flag is set, add it
        g: L / 4,                                           // entity speed
        t: L - 1,                                           // entity type
        w: L > 3 && 25,                                     // entity warp / explosion frame
        s: L = 0,                                           // entity target (and clear entity flag)
        u: 0,                                               // entity X velocitiy
        v: 0,                                               // entity Y velocitiy
        z: 0,                                               // entity timer
        x: O,                                               // entity X position
        y: N                                                // entity Y position
    })
  }

  $++;                                                   // increment frame counter

}, 16)