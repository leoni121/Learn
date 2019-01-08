#include "LinkQueue.h"
#include "LinkStack.h"

int main()
{
	TreeNodePtr BT;
	TreeNodePtr CreateBitree();
	int BiTreeTranc(TreeNodePtr);
	
	printf("Input:\n");
	BT = CreateBitree();
	BiTreeTranc(BT);
	return 0;
}

TreeNodePtr CreateBitree()
{
	LinkQueue q;
	TreeNodePtr bt, p, R;
	char par, child, S;

	InitQueue(&q);
	bt = NULL;

	printf("请输入节点的双亲、节点及LR标记值：");

	scanf("%c", &par);
	scanf("%c", &child);
	scanf("%c", &S);


	while (child != '#')
	{
		p = (TreeNodePtr)malloc(sizeof(TreeNodePtr));
		p->data = child;
		p->Lch = NULL;
		p->Rch = NULL;
		if (par == '#')
		{
			bt = p;
			EnQueue(&q, p);

		}
		else
		{

			GetHead_Q(q, &R);
			while (R->data != par)
			{
				DeQueue(&q, &R);
				GetHead_Q(q, &R);
			}

			if (S == 'L')
			{
				R->Lch = p;
			}
			else
			{
				R->Rch = p;
				DeQueue(&q, &R);
			}

			EnQueue(&q, p);

		}

		printf("请输入节点的双亲、节点及LR标记值：");

		scanf("%c", &par);
		while (par == '\n')
			scanf("%c", &par);;
		scanf("%c", &child);
		scanf("%c", &S);
	}
	return bt;

}


int BiTreeTranc(TreeNodePtr BT)
{
	LinkStack S;
	TreeNodePtr temp;
	printf("Output:\n");
	printf("该二叉树的前序遍历结果如右所示：");
	InitStack(&S);
	ClearStack(&S);
	temp = BT;
	while (1)
	{
		if (temp == NULL)
		{
			if (StackIsEmpty(&S))
			{
				return 0;
			}
			else
			{
				Pop(&S, &temp);
				temp = temp->Rch;
			}
		}
		else
		{
			printf("%c", temp->data);
			Push(&S, temp);
			temp = temp->Lch;
		}
	}
}
