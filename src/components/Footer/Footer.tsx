import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container className="p-6">
        <p className="text-center text-zinc-500">
          Built By GP <br/><a className="underline font-medium text-inherit" href="">Source Code Link </a> 
        </p>
      </Container>
    </footer>
  );
}

export default Footer;