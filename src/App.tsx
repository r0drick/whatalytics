import * as React from 'react'
import './App.css'
import Parser from './utils/Parser'

const fileHandler = (file: File): Promise<Parser> => {
	return new Promise<Parser>((res, rej) => {
		if (typeof file === 'undefined') rej(new URIError('No file uploaded'))
		const reader = new FileReader()
		reader.onloadend = (e: ProgressEvent) => {
			const reader = e.target as FileReader
			if (reader.readyState === FileReader.DONE)
				res(new Parser(reader.result as string))
		}
		reader.readAsText(file)
	})
}

const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
	if (e.target.files!.length === 0) return
	const parser: Parser = await fileHandler(e.target.files![0])
}

export default class App extends React.Component {
	render() {
		return (
				<>
					<span className='logo'>Whatalytics</span>
					<input type='file' accept='.txt' onChange={handleUpload}/>
					<div id='result'/>
				</>
		)
	}
}