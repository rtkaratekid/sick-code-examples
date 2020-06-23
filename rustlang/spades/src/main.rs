use res::deck::Deck;
use res::game::Player;


fn main() {

    println!("[*] Make a deck of 52 cards");
    let mut deck: Deck = Deck::new();

   
    println!("\n[*] Shuffle the deck seven times in preparation for dealing");
    for _i in 0..7 {
        deck.shuffle();
    }
    deck.print();

    let player: Player = Player::new(deck.cards);


    println!("\n[*] Deal 13 cards to each player");


}
