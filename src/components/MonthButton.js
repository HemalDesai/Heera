import Link from 'next/link';

const MonthButton = ({ label, link }) => {
  return (
    <Link href={link}>
      <button
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '200px',
          margin: '10px auto',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#333',
          color: '#fff',
          textAlign: 'center',
          textDecoration: 'none',
          fontSize: '18px',
          
          // Media query for smaller screens
          '@media (max-width: 600px)': {
            width: '80%',
            maxWidth: 'none',
          },
        }}
      >
        {label}
      </button>
    </Link>
  );
};

export default MonthButton;
