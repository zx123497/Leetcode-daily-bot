const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`

// We can pass the JSON response as an object to our createTodoistTask later.
const fetchDailyCodingChallenge = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init)
    return response.json()
}

const getDailyCodingChallenge = async () => {
    const question = await fetchDailyCodingChallenge();
    const questionTitle = question.data.activeDailyCodingChallengeQuestion.question.title;
    const questionLink = question.data.activeDailyCodingChallengeQuestion.link;
    const questionDate = question.data.activeDailyCodingChallengeQuestion.date;
    return {questionTitle, questionLink, questionDate};
}


module.exports = {getDailyCodingChallenge};