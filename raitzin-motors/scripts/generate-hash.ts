/**
 * Script para generar el hash bcrypt de la contraseña del admin.
 *
 * Uso:
 *   npx tsx scripts/generate-hash.ts
 *
 * Luego copiá el hash generado y pegalo en .env.local como:
 *   ADMIN_PASSWORD_HASH=<hash>
 */

import * as readline from 'readline'
import bcryptjs from 'bcryptjs'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Ocultar la entrada del usuario al tipear la contraseña
function preguntarContraseña(pregunta: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(pregunta)

    // Deshabilitar echo para que no se vea la contraseña
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
    }

    let input = ''

    process.stdin.on('data', (chunk: Buffer) => {
      const char = chunk.toString()

      if (char === '\r' || char === '\n') {
        if (process.stdin.isTTY) {
          process.stdin.setRawMode(false)
        }
        process.stdout.write('\n')
        resolve(input)
      } else if (char === '\u0003') {
        // Ctrl+C
        process.exit()
      } else if (char === '\u007f') {
        // Backspace
        input = input.slice(0, -1)
      } else {
        input += char
      }
    })
  })
}

async function main() {
  console.log('\n=== Generador de hash para el panel admin de Raitzin Motors ===\n')

  let contraseña: string

  // Fallback si no es TTY (ej: pipes)
  if (!process.stdin.isTTY) {
    rl.question('Ingresá la contraseña: ', async (answer) => {
      rl.close()
      await generarHash(answer)
    })
    return
  }

  rl.close()
  contraseña = await preguntarContraseña('Ingresá la contraseña: ')

  if (!contraseña) {
    console.error('Error: la contraseña no puede estar vacía.')
    process.exit(1)
  }

  await generarHash(contraseña)
}

async function generarHash(contraseña: string) {
  if (!contraseña.trim()) {
    console.error('Error: la contraseña no puede estar vacía.')
    process.exit(1)
  }

  console.log('\nGenerando hash con bcrypt (saltRounds: 12)...\n')

  const hash = await bcryptjs.hash(contraseña, 12)

  console.log('Hash generado exitosamente:\n')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log('\nCopiá la línea de arriba y pegala en tu archivo .env.local')
}

main().catch((err) => {
  console.error('Error inesperado:', err)
  process.exit(1)
})
