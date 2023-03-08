import Link from "next/link";
import Card from "react-bootstrap/Card";
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";
export function getStaticProps() {
  return new Promise((resolve,reject)=>{
    fetch('https://agreeable-red-clam.cyclic.app/api/movies/573a139bf29313caabcf3d23').then(res=>res.json()).then(data=>{
      resolve({ props: { movie: data } })
    })
  })
}
export default function About(props) {
  return (
    <>
    <strong><PageHeader text="About the Developer : Pawan Deep"/></strong>
      <Card>
        <Card.Body>
          My name is Pawan Deep I&apos;m 21 years old, 
          I&apos;m an Italian citizen but originally 
          I&apos;m from India, I shifted in Canada last 
          year in August for my studies. I&apos;m currently 
          studying in Seneca College in the fourth 
          semester in the CPP program. My hobbies are 
          playing football and listening to music, 
          I used to play football in italy in a club, 
          but in Canada I haven&apos;t started playing in a 
          club yet. In my life I&apos;ve visited lots of 
          places around Italy, India and across the 
          europe, in countries like Greece, Spain, 
          France and England. In canada I&apos;ve not 
          visited many places so far.
          <br/><br/>
          <p>My favourite movie is: <Link href="/movies/The Matrix"><a>&quot;The Matrix&quot;</a></Link></p>
        </Card.Body>
        <MovieDetails movie={props.movie}/>
      </Card>
    </>
  );
}