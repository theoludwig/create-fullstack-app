interface ErrorPageProps {
  message: string
  statusCode: number
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { message, statusCode } = props

  return (
    <>
      <h1>{statusCode}</h1>
      <div className='container-message'>
        <h2>{message}</h2>
      </div>

      <style jsx global>
        {`
          #__next {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
        `}
      </style>
      <style jsx>
        {`
          h1 {
            display: inline-block;
            margin: 0;
            font-size: 24px;
            font-weight: 500;
            vertical-align: top;
          }
          .container-message {
            display: inline-block;
            text-align: left;
            line-height: 49px;
            height: 49px;
            vertical-align: middle;
          }
          .container-message > h2 {
            font-size: 14px;
            font-weight: normal;
            line-height: inherit;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  )
}
