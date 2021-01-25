import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/widget.js'
import Footer from '../src/components/footer.js'
import GitHubCorner from '../src/components/githubcorner.js'

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

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <BackgroundImage>
      <QuizContainer>
        <Widget>
        <Widget.Header>
              <h1>The Witcher</h1>
            </Widget.Header>
          <Widget.Content>
            <p>asdadasd</p>
          </Widget.Content>
        </Widget>
        <Widget>
        <Widget.Content>
            <p>asdadasd</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/fernandaformiga" />
    </BackgroundImage>
  )
}
