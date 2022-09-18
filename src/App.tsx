import './styles/main.css';
import logoNlw from './assests/logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

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
    axios('http://localhost:3000/games')
      .then(response => {
        setGames(response.data)
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
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
