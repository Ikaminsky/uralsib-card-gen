import React, { type ReactElement, useEffect, useState } from 'react'
import { Card, FormField, Loader } from '../components'
import image_top from '../assets/image_top.png'


const RenderCards = ({ data, title }: { title: string, data: any[] }): JSX.Element => {
	if (data?.length > 0) {
		return (
			<>
				{data.map((post) => <Card key={post._id} {...post} />)}
			</>)
	} else {
		return (
			<h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
		)
	}

}

export const Home = (): ReactElement => {
	const [loading, setLoading] = useState(false)
	const [allPosts, setAllPosts] = useState<any[] | null>(null)
	const [searchText, setSearchText] = useState('')
	const [searchedResults, setSearchedResults] = useState<any[] | null>(null)
	const [searchTimeout, setSearchTimeout] = useState<number>(0)

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		clearTimeout(searchTimeout);

		setSearchText(e.target.value)

		setSearchTimeout(
			setTimeout(() => {
				if (Array.isArray(allPosts)) {
					const searchResults = allPosts.filter((item: { name: string, prompt: string }) => item.name.toLowerCase().includes(searchText.toLowerCase()) ||
						item.prompt.toLowerCase().includes(searchText.toLowerCase()))
					setSearchedResults(searchResults);
				}
			}, 500)
		);
	}

	useEffect(() => {
		const fetchPosts = async (): Promise<void> => {
			try {
				setLoading(true)
				const response = await fetch('https://dall-e-kp7q.onrender.com/api/v1/post', {
					method: 'GET',
					headers: {
						'Content-type': 'application/json'
					}
				})

				if (response.ok) {
					const posts = await response.json()
					setAllPosts(posts.data.reverse())
				}
			} catch (err) {
				alert('Error!')
			} finally {
				setLoading(false)
			}
		}
		void fetchPosts().then(() => {
		})
	}, [])

	console.log(allPosts)

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>
					<div className='flex justify-center flex-row py-[53px] flex-wrap gap-10'>
						<div className='flex justify-start flex-col mt-[11px]'>
							<h1 className='flex flex-1 flex-col justify-between font-bold text-[70px] leading-[85px] text-[#3B175C]'>
								Ваша карта - <br/>Ваш дизайн
							</h1>
							<p className='text-left mt-[11px] text-[24px] font-light leading-[29px] text-[#3B175C]'>
								Создайте свой уникальный дизайн карты <br/>с помощью Искусственного Интелекта
							</p>
						</div>
						<div className='flex flex-col justify-start'>
							<div className='justify-end items-start flex-col h-[358px] w-[609px]'>
								<img src={image_top} alt="image_top" />
							</div>
						</div>
					</div>
				</h1>
			</div>
			<div className='mt-16'>
				<FormField
					labelName='Поиск идей (уже созданные карты)'
					type='text'
					name='text'
					placeholder='Вбейте то, что хотите найти'
					value={searchText}
					handleChange={handleSearchChange}
				/>
			</div>
			<div className='mt-10'>
				{loading ? (
					<div className='flex justify-center items-center'>
						<Loader />
					</div>
				) : (
					<>
						{Boolean(searchText.length) && (
							<h2 className='font-medium text-[#666e75] text-xl mb-3'>
								Showing results form <span className='text-[#222328]'>{searchText}</span>
							</h2>
						)}
						<div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
							{searchText.length ?
								<RenderCards title='Нет результата!' data={searchedResults ?? []} /> :
								<RenderCards title='Еще нет постов :)' data={allPosts ?? []} />
							}
						</div>
					</>
				)}
			</div>
		</section>
	)
}
