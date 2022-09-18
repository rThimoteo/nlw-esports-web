import './styles/main.css';
import logoNlw from './assests/logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { Button } from './components/Form/Button';

function App() {

  interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      Ads: number
    }
  }

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoNlw} alt="" />

      <h1 className='text-6xl text-white font-black mt-20 bg-nlw-gradient bg-clip-text'>
        Seu <span className='text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game, index) => {
          return (
            <GameBanner
              key={`${game.id}${index}`}
              title={game.title}
              adsCount={game._count.Ads}
              bannerUrl={game.bannerUrl}
            />
          )
        })
        }

      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
          <Dialog.Content className='fixed bg-[#2A2635] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 ' >
            <Dialog.Title className=' text-3xl font-black ' >
              Publique um anúncio
            </Dialog.Title>

            <form className='mt-8 flex flex-col gap-4' >
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold' >Qual o game?</label>
                <Input id="game" placeholder='Selecione o jogo que deseja jogar' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Qual seu nome (ou nickname)</label>
                <Input type="text" id="name" placeholder='Como te chamam dentro do game?' />
              </div>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input type="number" id="yearsPlaying" placeholder='Tudo bem ser Zero' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input type="text" id="discord" placeholder='Usuario#0000' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className='grid grid-cols-4 gap-1'>
                    <Button title="Domingo">D</Button>
                    <Button title="Segunda">S</Button>
                    <Button title="Terça">T</Button>
                    <Button title="Quarta">Q</Button>
                    <Button title="Quinta">Q</Button>
                    <Button title="Sexta">S</Button>
                    <Button title="Sábado">S</Button>
                  </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" id="hourStart" placeholder='De' />
                    <Input type="time" id="hourEnd" placeholder='Até' />
                  </div>
                </div>
              </div>
              <div className='mt-2 flex gap-2 text-sm'>
                <input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>
              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                  type='button'
                >
                  Cancelar
                </Dialog.Close>
                <button
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700'
                  type='submit'
                >
                  <GameController size='24' />
                  Encontrar Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App
