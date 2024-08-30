package main

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func TestNearText(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetNearText
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithLimit(2).
		Do(ctx)
	// END GetNearText

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Contains(t, question, "question")
		assert.Contains(t, question, "answer")
		assert.Contains(t, question, "_additional")
		additional := question["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "distance")
	}
}

func TestNearObject(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetNearObject
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearObject(client.GraphQL().NearObjectArgBuilder().
			WithID("56b9449e-65db-5df4-887b-0a4773f52aa7")).
		WithLimit(2).
		Do(ctx)
	// END GetNearObject

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Contains(t, question, "question")
		assert.Contains(t, question, "answer")
		assert.Contains(t, question, "_additional")
		additional := question["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "distance")
	}
}

func TestNearVector(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetNearVector
	vector := []float32{-0.0125526935, -0.021168863, -0.01076519, -0.02589537, -0.0070362035, 0.019870078, -0.010001986, -0.019120263, 0.00090044655, -0.017393013, 0.021302758, 0.010055545, 0.02937665, -0.003816019, 0.007692291, 0.012385325, 0.032750815, 0.020847514, 0.020311933, -0.022159688, -0.0009924996, 0.009399457, 0.0022226637, -0.029510546, 0.014393755, -0.007223657, 0.018276723, -0.03639277, -0.010001986, -0.022842556, 0.010363504, -0.020927852}
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearVector(client.GraphQL().NearVectorArgBuilder().
			WithVector(vector)).
		WithLimit(2).
		Do(ctx)
	// END GetNearVector

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Contains(t, question, "question")
		assert.Contains(t, question, "answer")
		assert.Contains(t, question, "_additional")
		additional := question["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "distance")
	}
}

func TestLimitOffset(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetLimitOffset
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithLimit(2).
		WithOffset(1).
		Do(ctx)
	// END GetLimitOffset

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
}

func TestWithDistance(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetWithDistance
	maxDistance := float32(0.18)
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"}).
			WithDistance(maxDistance)).
		Do(ctx)
	// END GetWithDistance

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		additional := question["_additional"].(map[string]interface{})
		distance := additional["distance"].(float64)
		assert.Less(t, distance, maxDistance)
	}
}

func TestWithAutocut(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START Autocut
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithAutocut(1).
		Do(ctx)
	// END Autocut

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	// Additional assertions can be added based on expected autocut behavior
}

func TestWithGroupBy(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetWithGroupBy
	maxGroups := 2
	maxObjectsPerGroup := 2
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithLimit(10).
		WithGroupBy(client.GraphQL().GroupByArgBuilder().
			WithPath([]string{"round"}).
			WithGroups(maxGroups).
			WithObjectsPerGroup(maxObjectsPerGroup)).
		WithFields(graphql.Field{
			Name: "_additional",
			Fields: []graphql.Field{
				{Name: "group",
					Fields: []graphql.Field{
						{Name: "id"},
						{Name: "groupedBy",
							Fields: []graphql.Field{
								{Name: "path"},
								{Name: "value"},
							},
						},
						{Name: "count"},
						{Name: "minDistance"},
						{Name: "maxDistance"},
						{Name: "hits",
							Fields: []graphql.Field{
								{Name: "question"},
								{Name: "answer"},
							},
						},
					},
				},
			},
		}).
		Do(ctx)
	// END GetWithGroupBy

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.LessOrEqual(t, len(jeopardyQuestions), maxGroups)

	for _, group := range jeopardyQuestions {
		groupData := group.(map[string]interface{})
		additional := groupData["_additional"].(map[string]interface{})
		groupInfo := additional["group"].(map[string]interface{})
		assert.Contains(t, groupInfo, "id")
		assert.Contains(t, groupInfo, "groupedBy")
		assert.Contains(t, groupInfo, "count")
		assert.Contains(t, groupInfo, "minDistance")
		assert.Contains(t, groupInfo, "maxDistance")
		assert.Contains(t, groupInfo, "hits")

		hits := groupInfo["hits"].([]interface{})
		assert.LessOrEqual(t, len(hits), maxObjectsPerGroup)
	}
}

func TestWithWhere(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetWithFilter
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "round"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithLimit(2).
		WithWhere(filters.Where().
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueString("Double Jeopardy!")).
		Do(ctx)
	// END GetWithFilter

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))

	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Equal(t, "Double Jeopardy!", question["round"])
	}
}