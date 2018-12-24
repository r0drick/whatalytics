import * as React from 'react'
import './App.sass'
import Parser from './utils/Parser'
// @ts-ignore
import Fullpage from 'fullpage.js'

const fileHandler = (file: File): Promise<string> => {
	return new Promise<string>((res, rej) => {
		if (typeof file === 'undefined') rej(new URIError('No file uploaded'))
		const reader = new FileReader()
		reader.onloadend = () => {
			if (reader.readyState === FileReader.DONE)
				res(reader.result as string)
		}
		reader.readAsText(file)
	})
}

type AppState = {
	elements: JSX.Element[]
}

export default class App extends React.Component<{}, AppState> {
	fullpage: any
	parser: Parser

	constructor() {
		super({})
		this.handleUpload = this.handleUpload.bind(this)
		this.parser = new Parser()
		this.state = {
			elements: [],
		}
	}

	handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files!.length === 0) return
		fileHandler(e.target.files![0]).then(chat => {
			this.setState({
				elements: this.parser.run(chat),
			})
		})
	}

	componentDidMount() {
		this.fullpage = new Fullpage('#page', {sectionsColor: ['f2f2f2']})
	}

	componentDidUpdate() {
		this.fullpage.destroy()
		this.fullpage = new Fullpage('#page', {sectionsColor: ['cccccc']})
		if (this.state.elements.length > 0)
			this.fullpage.moveTo(2)
	}

	render() {
		return (
				<div id='page'>
					<div className='section'>
						<span className='logo'>Whatalytics</span>
						<form>
							<label htmlFor='upload-dialog'>Upload a File</label>
							<input id='upload-dialog' type='file' accept='.txt' onChange={this.handleUpload}
										 style={{display: 'none'}}/>
						</form>
					</div>
					{this.state.elements.length > 0 ? this.state.elements.map(element => <div
							className='section'>{element}</div>) : <></>}
				</div>
		)
	}
}