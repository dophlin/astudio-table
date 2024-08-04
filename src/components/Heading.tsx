
interface HeadingProps {
    text: string
}
export default function Heading(props: HeadingProps) {

    const { text } = props

    return (
        <h1 className="text-2xl font-bold uppercase">{text}</h1>
    )
}
