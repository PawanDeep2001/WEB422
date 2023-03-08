import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import MovieDetails from '../../components/MovieDetails';
import PageHeader from '../../components/PageHeader';

export default function MovieByTitle() {
    const router = useRouter();
    const { title } = router.query;
    const { data, error } = useSWR(`https://agreeable-red-clam.cyclic.app/api/movies?page=1&perPage=10&title=${title}`);
    if (data == null || data == undefined) {
        return null;
      } 
    else {
        if (data[0]==undefined) {
          return (
            <> <Error statusCode={404} /> </>
          )
        } 
        else {
          return (
            <>
              {data.map((movies) => (
                <>
                <div key={movies._id}>
                  <strong><PageHeader text={movies.title} /></strong>
                  <MovieDetails movie={movies} />
                </div>
                <br />
                </>
              ))}
            </>
          )
        }
    }
}