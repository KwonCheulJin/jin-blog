import NextImage, { ImageProps } from 'next/image'

export default function Image({ ...rest }: ImageProps) {
  return <NextImage {...rest} />
}

