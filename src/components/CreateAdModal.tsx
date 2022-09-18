import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import { Button } from "./Form/Button";
import { Input } from "./Form/Input";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FormEvent, useEffect, useState } from "react";
import axios from 'axios';

export function CreateAdModal() {

  interface Game {
    id: string;
    title: string;
  }

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoiceChannel
    })

    alert('Anúncio criado!')
    } catch (error) {
      alert('Erro ao criar anúncio')
      console.log(error)
    }
    
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2635] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 ' >
        <Dialog.Title className=' text-3xl font-black ' >
          Publique um anúncio
        </Dialog.Title>

        <form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold' >Qual o game?</label>
            <select
              id="game"
              name="game"
              defaultValue={""}
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'>
              <option disabled value="">Selecione o jogo que deseja jogar</option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>{game.title}</option>
                )
              })}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Qual seu nome (ou nickname)</label>
            <Input type="text" id="name" name="name" placeholder='Como te chamam dentro do game?' />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input type="number" id="yearsPlaying" name="yearsPlaying" placeholder='Tudo bem ser Zero' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input type="text" id="discord" name="discord" placeholder='Usuario#0000' />
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className='grid grid-cols-4 gap-1'
                onValueChange={(value) => { setWeekDays(value) }}
                value={weekDays}
              >
                <Button isSelected={weekDays.includes('0')} value='0' title='Domingo'>D</Button>
                <Button isSelected={weekDays.includes('1')} value='1' title='Segunda'>S</Button>
                <Button isSelected={weekDays.includes('2')} value='2' title='Terça'>T</Button>
                <Button isSelected={weekDays.includes('3')} value='3' title='Quarta'>Q</Button>
                <Button isSelected={weekDays.includes('4')} value='4' title='Quinta'>Q</Button>
                <Button isSelected={weekDays.includes('5')} value='5' title='Sexta'>S</Button>
                <Button isSelected={weekDays.includes('6')} value='6' title='Sábado'>S</Button>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-1'>
                <Input type="time" id="hourStart" name="hourStart" placeholder='De' />
                <Input type="time" id="hourEnd" name="hourEnd" placeholder='Até' />
              </div>
            </div>
          </div>
          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={() => setUseVoiceChannel(!useVoiceChannel)}
              checked={useVoiceChannel}
            >
              <Checkbox.Indicator >
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
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
  )
}