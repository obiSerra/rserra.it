---
title: Playing with Prompts
date: "2023-05-24"
description: "Experimenting with Prompt Engineering"
---
## Why?
<small>
<ul>
<li>Large Language Models are the latest hot topic, mainly thanks to ChatGPT.</li>
<li>Being able to correctly interact with an LLM is becoming an increasingly valuable skill</li>
<li>Prompt Engineering is an interesting field that allow us to better understand how LLMs work</li>
</ul>
</small>

---

In recent times, Large Language Models (LLMs) have gained tremendous popularity, and ChatGPT is among the leading ones. 
The capability to interact with LLMs is gaining more value.
<span class="highlight">Prompt Engineering</span> acts as an intriguing field, aiding us in comprehending the mechanisms of LLMs better. **

<collapse-note open="** show prompt" close="** hide prompt">
<strong>Prompt:</strong>
<pre>Your job is to perform the following tasks; for each task generate a separate section:
1. Read the text delimited by triple underscore (___).
2. Write a summary of it, highlighting the most important concepts.
3. Rephrase the summary as it was a paragraph from a blog post.
___
Large Language Models are the latest hot topic, mainly thanks to ChatGPT.
Being able to correctly interact with an LLM is becoming an increasingly valuable skill
Prompt Engineering is an interesting field that allow us to better understand how LLMs work
___
</pre>
<strong>Completion:</strong>
<pre>

Summary: Large Language Models (LLMs) are currently trending, with ChatGPT leading the way. The ability to effectively communicate with LLMs is becoming a highly sought-after skill. 
One field that is helping us gain a deeper understanding of LLMs is Prompt Engineering.

Rephrased: In recent times, Large Language Models (LLMs) have gained tremendous popularity, and ChatGPT is among the leading ones. 
The capability to interact with LLMs is gaining more value. Prompt Engineering acts as an intriguing field, aiding us in comprehending the mechanisms of LLMs better.
</pre>
</collapse-note>


## Basic principles

<small>
<ul>
<li>use delimiters and list to make the prompt more explicit </li>
<li>be clear about what are the "rules" and what is the content that needs to be evaluated</li>
<li>give the model more time to think, by splitting the prompt in multiple steps</li>
<li>ask the model to generate an answer for each step to increase consistency (<span class="highlight">chain-of-thoughts</span>)</li>
</ul>
</small>

---
In order to enhance the performance of language models, there are several techniques that can be employed. One of the most effective is to <span class="highlight">use delimiters and lists</span> to make the prompts clearer. By using these tools, the model is better able to distinguish between the rules and the content that needs to be evaluated, allowing it to generate more accurate responses. Another approach is to <span class="highlight">break the prompt down into multiple steps</span>, asking the model to generate an answer for each step. This gives the model more time to consider its response and creates a more consistent chain-of-thoughts. By implementing these strategies, language models can be improved to better serve their intended purposes. **


<collapse-note open="** show prompt" close="** hide prompt">
<strong>Prompt:</strong>
<pre>Your job is to perform the following tasks; for each task generate a separtate section:
1. Read the text delimited by triple underscore (___).
2. Write a summary of it, highlighting the most important concepts.
3. Rephrase the summary as it was a paragraph from a blog post.

___
use delimiters and list to make the prompt more explicit 
be clear about what are the "rules" and what is the content that needs to be evaluated
give the model more time to think, by splitting the prompt in multiple steps
ask the model to generate an answer for each step to increase consistency (chain-of-thoughts)
___
</pre>
<strong>Completion:</strong>
<pre>

The text discusses strategies for improving the performance of language models. It suggests using delimiters and lists to make the prompt more explicit, clearly separating rules from content to be evaluated. Additionally, breaking the prompt into multiple steps allows more time for the model to think and creates consistency in its chain-of-thoughts.

In order to enhance the performance of language models, there are several techniques that can be employed. One of the most effective is to use delimiters and lists to make the prompts clearer. By using these tools, the model is better able to distinguish between the rules and the content that needs to be evaluated, allowing it to generate more accurate responses. Another approach is to break the prompt down into multiple steps, asking the model to generate an answer for each step. This gives the model more time to consider its response and creates a more consistent chain-of-thoughts. By implementing these strategies, language models can be improved to better serve their intended purposes.
</pre>
</collapse-note>


## A fairly reusable template
Even if the meta-prompt needs to be refined and adjusted depending on the specific task, we can generate a fairly generic template for generating prompts
```
Your job is to perform the following tasks; for each task generate a separate section:
1. <Read the actual prompt delimited by a unique marking (___)>
2. <Intermediary step>
3. <Generate the output applying a specific style>.
___
<The actual prompt>
___
```


## Next steps
<small>
<ul>
<li> Divide each sub-step (thought) in a separate completion </li>
<li> Use another instance of the model to evaluate the output of the previous step </li>
<li> Implement the Tree of Thoughts <a href="https://arxiv.org/abs/2305.10601" title="paper">Paper</a> - <a href="https://youtu.be/ut5kp56wW_4" title="explanation">Video Explanation</a></li>
</small>

---

As we continue to develop our approach to problem-solving, there are a few areas I'm particularly interested in exploring further. Firstly, I believe that dividing each sub-step into a separate completion could be a game-changer. Secondly, I think it would be valuable to use another model to evaluate the output of each step. And finally, I'm excited to try implementing the Tree of Thoughts. **

<collapse-note open="** show prompt" close="** hide prompt">
<strong>Prompt:</strong>
<pre>Your job is to perform the following tasks; for each task generate a separtate section:
1. Read the text delimited by triple underscore (___).
2. Write a summary of it, highlighting the most important concepts.
3. Rephrase the summary as it was a paragraph from a blog post.
___
Some of the thinks I would like to explore in the near future are: divide each sub-step (thought) in a separate completion , use another instance of the model to evaluate the output of the previous step and 
implement the Tree of Thoughts ([https://arxiv.org/abs/2305.10601](Paper) [https://youtu.be/ut5kp56wW_4](Paper explanation))
___
</pre>
<strong>Completion:</strong>
<pre>

Summary: The author lists three things they would like to explore in the future: dividing sub-steps, using a model to evaluate output, and implementing the Tree of Thoughts.

Blog post paragraph: As we continue to develop our approach to problem-solving, there are a few areas I'm particularly interested in exploring further. Firstly, I believe that dividing each sub-step into a separate completion could be a game-changer. Secondly, I think it would be valuable to use another model to evaluate the output of each step. And finally, I'm excited to try implementing the Tree of Thoughts to see if it can help us streamline our thought processes even further.
</pre>
</collapse-note>


## Some notes on this post

* All the text is generated using OpenAi APIs with `gpt-3.5-turbo` as model
* <span class="highlight">This is a work in progress</span>, I'll update it as I explore about prompt engineering
* All the text that have been generated by AI is marked with **; the original prompt and completion are hidden in a collapsible section. In each section I also provided the the list of my inputs (in small)

I'm still not sure how the following components affect the model performance:
* the size of the meta-prompt (compared with the size of the actual prompt)
* the total length

During the generation of this post I noticed that formatting characters (like `*` or `-` for a list) are tends to confuse the model. All the latest attempts were done using without any special formatting.

All the example presented in this post used the LLM as a tool to transform and enhance the knowledge provided inside the actual prompt. Other experiments done with tasks that required knowledge provided by the model itself (not just understanding and rephrasing) seems to show that all the principles presented in this post are still valid.

All the code used to interact with GPT is available on [Github](https://github.com/obiSerra/gpt_api_exp/tree/playing-with-prompts)
