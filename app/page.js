import styles from './page.module.css'

export default function Home() {
  // The set of pastel colors to be used as backgrounds for the link cards
  const pastelColors = [
    'rgba(252, 182, 28, 1)',
    'rgba(157, 207, 123, 1)',
    'rgba(0, 148, 114, 1)',
    'rgba(244, 127, 42, 1)',
    'rgba(112, 101, 155, 1)',
    'rgba(126, 77, 120, 1)',
    'rgba(6, 139, 176, 1)',
    'rgba(99, 205, 243, 1)',
  ];

  // The set of cards with their appropriate links and details
  const cards = [
    {
      href: '/boards/trending',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🔥 Trending',
      paragraph: 'See what ideas are hot and current here!',
    },
    {
      href: '/boards/career_services',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🧑‍💼 Career Services',
      paragraph: 'Tell your thoughts on our career resources!',
    },
    {
      href: '/boards/classes',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🧑‍💻 Classes',
      paragraph: 'Have feedback about current and existing classes? Give it here!',
    },
    {
      href: '/boards/classrooms',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🏫 Classrooms',
      paragraph: 'Is there room for improvement with our classrooms? Tell us here!',
    },
    {
      href: '/boards/community',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🌐 Community',
      paragraph: "Thoughts on SCI culture or social life? Let us know how you feel!",
    },
    {
      href: '/boards/curriculum',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '📚 Curriculum ',
      paragraph:
        "Think our curriculum needs some updating? Let us know!",
    },
    {
      href: '/boards/events',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '📅 Events ',
      paragraph:
        "Give us your thoughts on past events or ideas for new ones!",
    },
    {
      href: '/boards/lounges',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🛋️ Lounges ',
      paragraph:
        "Want better places to take it easy at SCI? Drop us some thoughts!",
    },
    {
      href: '/boards/misc',
      className: styles.card,
      target: '_self',
      rel: 'noopener noreferrer',
      header: '🦆 Miscellaneous ',
      paragraph:
        "Got some random thoughts for SCI? We want them!",
    },
  ]

  // Function to get and cycle through each of the pastel colors
  function getNextPastelColor() {
    const color = pastelColors.shift();
    pastelColors.push(color);
    return color;
  }

  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            className={card.className}
            style={{ backgroundColor: pastelColors[index % pastelColors.length] }}
            target={card.target}
            rel={card.rel}
          >
            <h2>{card.header}</h2>
            <p>{card.paragraph}</p>
          </a>
        ))}

      </div>
    </main>
  )
}
