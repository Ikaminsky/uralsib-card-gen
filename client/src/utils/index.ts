import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

export function getRandomPrompt(prompt: string): string {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
	const randomPrompt = surpriseMePrompts[randomIndex]

	if (randomPrompt === prompt) return getRandomPrompt(prompt)

	return randomPrompt
}

export async function downloadImage(_id: string, photo: string): Promise<void> {
	FileSaver.saveAs(photo, `download-${_id}.jpg`)
}