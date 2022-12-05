# How should we present a tutorial of our software to the users?

## Context and Problem Statement

When users interact with our website, they might be able to intuitively understand how to use our software, but they also might not. In case they don't, our software should include a tutorial that the user can optionally refer to on how to navigate the website

## Considered Options

* A written description of how to use the software with images of key steps (such as adding a card)
* A gif demonstrating how the website is to be navigated and used
* A video demonstrating how the website is to be navigated and used with voiceover
* Interactive tutorial doing fancy animations such as highlighting specified coffee cards or other buttons on the website

## Decision Outcome

Chosen option: We decided to go simple and have a written tutorial with steps be shown when the user clicks the help button and selects the guidance option. This is the simplest idea to execute in comparison to something like the interactive tutorial, which would be difficult to implement. In addition, from the perspective of the users, they might be frustrated if the gif or video autoplayed and skipped past the part of the website they were having difficulty with, and need to watch the gif/video from the beginning again. So the written tutorial strikes a balance between being simple enough to implement and being well received by users.
<br>
For added clairity, we had each step apply a glow effect to the specific element on the page that the step was explaining. We also used more muted colors on the guidance page in comparison to the main page, so that this glow effect was more noticeable.
