interface IProps {
    src: string;
    alt: string;
    className?: string;
}

export default function Image(props: IProps) {
    const { src, alt, className } = props;

    return(
        <img src={src} alt={alt} className={className} />
    )
}