
// TODO: Deal 13 cards to four players
pub mod deck {

    use rand::thread_rng;
    use rand::seq::SliceRandom;
    use std::fmt;
    use std::vec::Vec;
    use std::slice::Iter;
    use self::Value::*;

    pub enum Suit {
        Heart,
        Diamond,
        Club,
        Spade,
    }
    
    impl std::fmt::Display for Suit {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            match *self {
                Suit::Heart => write!(f, "♡"),
                Suit::Diamond => write!(f, "♢"),
                Suit::Club => write!(f, "♧"),
                Suit::Spade => write!(f, "♤"),
            }
        }
    }
    // Probably not the smartest
    #[derive(Copy, Clone)]
    pub enum Value {
        Two,
        Three,
        Four,
        Five,
        Six,
        Seven,
        Eight,
        Nine,
        Ten,
        Jack,
        Queen,
        King,
        Ace,
    }
    
    impl std::fmt::Display for Value {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            match *self {
                Value::Two => write!(f, "Two"),
                Value::Three => write!(f, "Three"),
                Value::Four => write!(f, "Four"),
                Value::Five => write!(f, "Five"),
                Value::Six => write!(f, "Six"),
                Value::Seven => write!(f, "Seven"),
                Value::Eight => write!(f, "Eight"),
                Value::Nine => write!(f, "Nine"),
                Value::Ten => write!(f, "Ten"),
                Value::Jack => write!(f, "Jack"),
                Value::Queen => write!(f, "Queen"),
                Value::King => write!(f, "King"),
                Value::Ace => write!(f, "Ace"),
            }
        }
    }
    
    impl Value {
        pub fn iter() -> Iter<'static, Value> {
            static VALUES: [Value; 13 /*13 card ranks*/] = [Two, Three, Four,
                                                            Five, Six, Seven,
                                                            Eight, Nine, Ten, 
                                                            Jack, Queen, King, Ace];
            VALUES.iter()
        }
    }
    
    // #[derive(Debug)]
    pub struct Card {
        val: Value,
        suit: Suit,
    }
    
    impl std::fmt::Display for Card {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
             write!(f, "{} - {}", self.val, self.suit)
        }
    }
    
    impl Card {
        /// Constructor to make a new card
        pub fn new(val: Value, suit: Suit) -> Card {
            Card { 
                val,
                suit, 
            }
        }
    
    }
    
    pub struct Deck {
        pub cards: Vec<Card>,
    }
    
    impl Deck {
        pub fn new() -> Deck {
            let mut c = Vec::new();
            for val in Value::iter() {
    
                c.push(Card::new(*val, Suit::Heart));
                c.push(Card::new(*val, Suit::Club));
                c.push(Card::new(*val, Suit::Diamond));
                c.push(Card::new(*val, Suit::Spade));
    
            }
    
            Deck { 
                cards: c, 
            }
        }
    
        pub fn shuffle(&mut self) {
           self.cards.shuffle(&mut thread_rng()); 
        }
    
        pub fn print(&self) {
            for card in &self.cards[..] {
                println!("{}", card);
            }
     
        }
    }
}

pub mod game {
    use std::vec::Vec;
    use super::deck::*;

    pub struct Player {
       pub hand: Vec<Card>, 
    }

    impl Player {
        pub fn new(dealt_cards: Vec<Card>) -> Player {
            Player {hand: dealt_cards,}
        }
    }



}