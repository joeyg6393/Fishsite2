import { NextPage } from 'next';

const AboutPage: NextPage = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-8">About The Reel Authority</h1>
        
        <div className="space-y-6">
          <p>
            Welcome to The Reel Authority – a place where a love for fishing meets a relentless drive to explore, learn, and share everything about the world of fishing. I'm the voice behind the scenes here, a lifelong angler with a passion that started as a kid wading in muddy creeks and has grown into a deep commitment to mastering techniques, testing gear, and uncovering the best ways to land a catch.
          </p>

          <p>
            Here, you'll find no-nonsense reviews, practical guides, and tips that come straight from the water's edge, all meant to help you get the most out of your time with a line in the water. Whether you're casting in saltwater, exploring new rigs, or searching for that next piece of essential gear, The Reel Authority is here to give you honest, tested advice, and insights from someone who's just as dedicated to the sport as you are.
          </p>

          <p>
            So grab your tackle, get out there, and remember: every cast is a new chance to learn. Let's fish with purpose – and let's get better at it, together.
          </p>
        </div>
      </article>
    </main>
  );
};

export default AboutPage;
