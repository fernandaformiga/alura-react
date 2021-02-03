import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/widget.js';
import Footer from '../src/components/footer.js';
import Input from '../src/components/input.js';
import GitHubCorner from '../src/components/githubcorner.js';
import Head from 'next/head';
import React from 'react';
import Button from '../src/components/button.js';
import { useRouter } from 'next/router';
import QuizContainer from '../src/components/quizcontainer.js'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

// const: instead of the function, the library styled components allows creation of variable and the use of dynamic css
// add css directly to tag

// function Title(props) { // props / use parenthesis to organize big functions
//   return (
//     <h1>
//     {props.children}
//     </h1>
//     )
// }

// `` -> tags replace function, so it cain receive dynamic content

const BackgroundImage = styled.div`
// div could be replaced by something else
background-image: url(${db.bg});
flex: 1;
background-size: cover;
background-position: center;`

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <BackgroundImage>
      <Head><title>Witcher Quiz</title></Head>
      <QuizContainer>
        <Widget>
        <Widget.Header>
              <h1>The Witcher</h1>
            </Widget.Header>
            <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="What's your name?"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`PLAY`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
        <Widget.Content>
            <p>What do you know about Witcher 3?</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/fernandaformiga" />
    </BackgroundImage>
  )
}
