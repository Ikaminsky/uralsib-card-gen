import React, { type FormEvent, type ReactElement, useState } from 'react'
import { FormField, Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import preview from '../assets/preview.png'
import { getRandomPrompt } from '../utils'
import { CreditCard } from '../components/CreditCard'

export const CreatePost = (): ReactElement => {
	const navigate = useNavigate()

	const [form, setForm] = useState({
		name: '',
		prompt: '',
		photo: ''
	})

	const [generatingImg, setGeneratingImg] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}
	const handleSurpriseMe = (): void => {
		const randomPrompt = getRandomPrompt(form.prompt)
		setForm({ ...form, prompt: randomPrompt })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		if (form.prompt && form.photo) {
			setLoading(true)
			try {
				const response = await fetch('https://dall-e-kp7q.onrender.com/api/v1/post', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(form)
				})

				await response.json()
				navigate('/')
			} catch (err) {
				alert(err)
			} finally {
				setLoading(false)
			}
		} else {
			alert('Please enter prompt and generate image firstly')
		}
	}

	const generateImage = async (): Promise<void> => {
		if (form.prompt) {
			try {
				setGeneratingImg(true)
				const response = await fetch(
					'https://dall-e-kp7q.onrender.com/api/v1/dalee',
					{
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify({ prompt: `Лицевая сторона кредитной карты: ${form.prompt}` })
					})

				const data: { photo: string } = await response.json()
				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
			} catch (err) {
				alert('Error!')
			} finally {
				setGeneratingImg(false)
			}
		} else {
			alert('Сначала введите ваше описание')
		}
	}


	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>Создайте свою карту!</h1>
				<p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
					Искусственный интеллект предложит вам свой вариант
				</p>
			</div>

			<form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-5'>
					<FormField
						labelName='Ваше имя'
						type='text'
						name='name'
						placeholder='Илья Каминский'
						value={form.name}
						handleChange={handleChange}
					/>

					<FormField
						labelName='Описание вашей карты'
						type='text'
						name='prompt'
						placeholder='Импрессионистская картина маслом подсолнухов в пурпурной вазе…'
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>

					<div
						className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3 flex justify-center items-center'>
						{form.photo && !generatingImg ? (
							<CreditCard image={form.photo} name={form.name.length ? form.name : 'Введите свое имя'} />
						) : (
							<div className="w-64 p-3 h-64">
								<img
									src={preview}
									alt='preview'
									className='w-9/12 h-9/12 object-contain opacity-40'
								/>
							</div>
						)}

						{generatingImg && (
							<div
								className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
								<Loader />
							</div>
						)}
					</div>
				</div>

				<div className='mt-5 flex gap-5'>
					<button
						type='button'
						onClick={generateImage}
						className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
					>
						{generatingImg ? 'Создаем...' : 'Сгенерировать!'}
					</button>
				</div>

				<div className='mt-10'>
					<p className='mt-2 text-[#666e75] text-[14px]'>** Вы можете поделиться дизайном получившейся карты с другими пользователями **</p>
					<button
						type='submit'
						className='mt-3 text-white bg-[#3B175C] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center min-w-[250px]'
					>
						{loading ? 'Загрузка...' : 'Поделитесь с коммьюнити!'}
					</button>
				</div>
				<button
					disabled={!form.photo}
					type='submit'
					onClick={() => {
						window.open('https://www.uralsib.ru/', '__blank')
					}}
					className='mt-3 text-white bg-[#3B175C] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[250px]'
				>
					{form.photo ? 'Переходите к оформлению своей новой карты!' : 'Сначала сгенерируйте карту'}
				</button>
			</form>
		</section>
	)
}
